#!/bin/bash

# Release script for semantic versioning
# Usage: ./release.sh -v [major|minor|patch] [-m "custom message"] [-d] [-h]

set -e

VERSION_TYPE=""
CUSTOM_MESSAGE=""
DRY_RUN=false
HELP=false

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Show help
show_help() {
    echo "Release Script - Semantic Versioning Helper"
    echo ""
    echo "Usage: $0 -v [major|minor|patch] [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -v VERSION_TYPE  Version bump type (major, minor, patch, or specific version like 1.2.3)"
    echo "  -m MESSAGE       Custom release message (optional)"
    echo "  -d               Dry run - show what would happen without making changes"
    echo "  -h               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -v patch                           # Bump patch version"
    echo "  $0 -v minor -m 'Add new features'     # Bump minor with custom message"
    echo "  $0 -v 2.1.0                          # Set specific version"
    echo "  $0 -v patch -d                       # Dry run patch bump"
}

# Parse command line arguments
while getopts "v:m:dh" flag; do
    case "${flag}" in
        v) VERSION_TYPE=${OPTARG};;
        m) CUSTOM_MESSAGE=${OPTARG};;
        d) DRY_RUN=true;;
        h) HELP=true;;
        *) echo "Invalid option. Use -h for help."; exit 1;;
    esac
done

# Show help if requested
if [ "$HELP" = true ]; then
    show_help
    exit 0
fi

# Validate required parameters
if [[ -z "$VERSION_TYPE" ]]; then
    print_color $RED "Error: Version type is required. Use -h for help."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_color $RED "Error: Not in a git repository"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_color $RED "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Ensure we're on main/master branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
    print_color $YELLOW "Warning: You're not on main/master branch. Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Fetch latest changes
print_color $BLUE "Fetching latest changes..."
git fetch --prune --unshallow 2>/dev/null || git fetch --prune

# Get current version
CURRENT_VERSION=$(git tag | grep '^v' | sort -V | tail -n 1)
if [[ -z "$CURRENT_VERSION" ]]; then
    CURRENT_VERSION='v0.0.0'
fi

print_color $GREEN "Current Version: $CURRENT_VERSION"

# Determine new version
if [[ "$VERSION_TYPE" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    # Specific version provided
    NEW_TAG="v$VERSION_TYPE"
    VERSION_CHANGE="specific"
else
    # Strip the 'v' prefix and split into parts
    VERSION_NUM=${CURRENT_VERSION#v}
    IFS='.' read -r -a VERSION_PARTS <<< "$VERSION_NUM"
    
    # Get number parts
    VNUM1=${VERSION_PARTS[0]}
    VNUM2=${VERSION_PARTS[1]}
    VNUM3=${VERSION_PARTS[2]}
    
    # Increment version number based on the type
    case "$VERSION_TYPE" in
        major) VNUM1=$((VNUM1 + 1)); VNUM2=0; VNUM3=0; VERSION_CHANGE="major";;
        minor) VNUM2=$((VNUM2 + 1)); VNUM3=0; VERSION_CHANGE="minor";;
        patch) VNUM3=$((VNUM3 + 1)); VERSION_CHANGE="patch";;
        *)
            print_color $RED "Error: Invalid version type. Use major, minor, patch, or specific version (e.g., 1.2.3)"
            exit 1
            ;;
    esac
    
    NEW_TAG="v$VNUM1.$VNUM2.$VNUM3"
fi

print_color $YELLOW "New Version: $NEW_TAG ($VERSION_CHANGE)"

# Check if tag already exists
if git tag | grep -q "^$NEW_TAG$"; then
    print_color $RED "Error: Tag $NEW_TAG already exists"
    exit 1
fi

# Get current hash and check if it already has a tag
GIT_COMMIT=$(git rev-parse HEAD)
EXISTING_TAG=$(git describe --exact-match --tags "$GIT_COMMIT" 2>/dev/null || echo "")

if [[ -n "$EXISTING_TAG" ]]; then
    print_color $RED "Error: Current commit already has tag: $EXISTING_TAG"
    exit 1
fi

# Generate changelog since last tag
print_color $BLUE "Generating changelog..."
if [[ "$CURRENT_VERSION" != "v0.0.0" ]]; then
    CHANGELOG=$(git log --pretty=format:"* %s (%h)" "$CURRENT_VERSION"..HEAD)
else
    CHANGELOG=$(git log --pretty=format:"* %s (%h)")
fi

# Create release message
if [[ -n "$CUSTOM_MESSAGE" ]]; then
    RELEASE_MESSAGE="Release $NEW_TAG: $CUSTOM_MESSAGE"
else
    RELEASE_MESSAGE="Release $NEW_TAG"
fi

# Show what will happen
print_color $BLUE "Release Summary:"
echo "===================="
echo "Current Version: $CURRENT_VERSION"
echo "New Version: $NEW_TAG"
echo "Version Change: $VERSION_CHANGE"
echo "Release Message: $RELEASE_MESSAGE"
echo ""
echo "Changelog:"
if [[ -n "$CHANGELOG" ]]; then
    echo "$CHANGELOG"
else
    echo "No changes since last tag"
fi
echo "===================="

# Confirm or dry run
if [ "$DRY_RUN" = true ]; then
    print_color $YELLOW "DRY RUN - No changes made"
    exit 0
fi

echo ""
read -p "Proceed with release? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_color $YELLOW "Release cancelled"
    exit 0
fi

# Create and push tag
print_color $GREEN "Creating tag $NEW_TAG..."
git tag -a "$NEW_TAG" -m "$RELEASE_MESSAGE"

print_color $GREEN "Pushing tag to remote..."
git push origin "$NEW_TAG"
git push origin HEAD

# Output for GitHub Actions (if running in CI)
if [[ -n "$GITHUB_ENV" ]]; then
    echo "git-tag=$NEW_TAG" >> "$GITHUB_ENV"
    echo "release-version=${NEW_TAG#v}" >> "$GITHUB_ENV"
fi

print_color $GREEN "✅ Release $NEW_TAG completed successfully!"

# Show next steps
echo ""
print_color $BLUE "Next steps:"
echo "1. Check your CI/CD pipeline for automated builds"
echo "2. Create release notes on GitHub if needed"
echo "3. Update documentation if required"