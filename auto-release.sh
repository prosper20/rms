#!/bin/bash

# Auto-release script based on conventional commits
# This script analyzes commits since the last tag and suggests appropriate version bump

set -e

DRY_RUN=false
FORCE_RELEASE=false
CUSTOM_MESSAGE=""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

show_help() {
    echo "Auto Release Script - Analyze commits and suggest version bump"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -d               Dry run - analyze commits without creating release"
    echo "  -f               Force release even if no conventional commits found"
    echo "  -m MESSAGE       Custom release message"
    echo "  -h               Show this help message"
    echo ""
    echo "This script analyzes conventional commits since the last tag:"
    echo "- feat: triggers minor version bump"
    echo "- fix: triggers patch version bump"
    echo "- BREAKING CHANGE: triggers major version bump"
    echo "- Other types (docs, style, refactor, test, chore, ci, build): no version bump"
}

# Parse arguments
while getopts "dfm:h" flag; do
    case "${flag}" in
        d) DRY_RUN=true;;
        f) FORCE_RELEASE=true;;
        m) CUSTOM_MESSAGE=${OPTARG};;
        h) show_help; exit 0;;
        *) echo "Invalid option. Use -h for help."; exit 1;;
    esac
done

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_color $RED "Error: Not in a git repository"
    exit 1
fi

# Fetch latest changes
git fetch --prune --unshallow 2>/dev/null || git fetch --prune

# Get current version
CURRENT_VERSION=$(git tag | grep '^v' | sort -V | tail -n 1)
if [[ -z "$CURRENT_VERSION" ]]; then
    CURRENT_VERSION='v0.0.0'
    COMMIT_RANGE="HEAD"
else
    COMMIT_RANGE="$CURRENT_VERSION..HEAD"
fi

print_color $GREEN "Current Version: $CURRENT_VERSION"

# Get commits since last tag
COMMITS=$(git log --pretty=format:"%s" "$COMMIT_RANGE")

if [[ -z "$COMMITS" ]]; then
    print_color $YELLOW "No commits found since last tag"
    if [[ "$FORCE_RELEASE" != true ]]; then
        exit 0
    fi
fi

# Analyze commits for conventional commit patterns
MAJOR_BUMP=false
MINOR_BUMP=false
PATCH_BUMP=false
OTHER_COMMITS=()

echo ""
print_color $BLUE "Analyzing commits since $CURRENT_VERSION:"
echo "================================================"

while IFS= read -r commit; do
    if [[ -z "$commit" ]]; then
        continue
    fi
    
    echo "• $commit"
    
    # Check for breaking changes
    if [[ "$commit" =~ BREAKING[[:space:]]CHANGE ]] || [[ "$commit" =~ ^[^:]+!: ]]; then
        MAJOR_BUMP=true
        print_color $RED "  → BREAKING CHANGE detected (major bump)"
    # Check for features
    elif [[ "$commit" =~ ^feat(\([^)]+\))?: ]]; then
        MINOR_BUMP=true
        print_color $GREEN "  → Feature (minor bump)"
    # Check for fixes
    elif [[ "$commit" =~ ^fix(\([^)]+\))?: ]]; then
        PATCH_BUMP=true
        print_color $YELLOW "  → Bug fix (patch bump)"
    # Check for other conventional commit types
    elif [[ "$commit" =~ ^(docs|style|refactor|test|chore|ci|build)(\([^)]+\))?: ]]; then
        OTHER_COMMITS+=("$commit")
        print_color $BLUE "  → Other change (no version bump)"
    else
        OTHER_COMMITS+=("$commit")
        print_color $BLUE "  → Non-conventional commit"
    fi
done <<< "$COMMITS"

echo ""

# Determine version bump type
if [[ "$MAJOR_BUMP" == true ]]; then
    VERSION_TYPE="major"
    print_color $RED "🔥 MAJOR version bump required (breaking changes detected)"
elif [[ "$MINOR_BUMP" == true ]]; then
    VERSION_TYPE="minor"
    print_color $GREEN "✨ MINOR version bump required (new features detected)"
elif [[ "$PATCH_BUMP" == true ]]; then
    VERSION_TYPE="patch"
    print_color $YELLOW "🐛 PATCH version bump required (bug fixes detected)"
else
    if [[ "$FORCE_RELEASE" == true ]]; then
        VERSION_TYPE="patch"
        print_color $BLUE "⚡ PATCH version bump (forced release)"
    else
        print_color $BLUE "ℹ️  No version-bumping changes detected"
        print_color $BLUE "   Found ${#OTHER_COMMITS[@]} non-bumping commits (docs, style, refactor, test, chore, ci, build)"
        echo ""
        echo "Use -f flag to force a patch release anyway"
        exit 0
    fi
fi

# Show summary
echo ""
print_color $BLUE "Release Summary:"
echo "=================="
echo "Suggested version bump: $VERSION_TYPE"

# Calculate new version
VERSION_NUM=${CURRENT_VERSION#v}
IFS='.' read -r -a VERSION_PARTS <<< "$VERSION_NUM"
VNUM1=${VERSION_PARTS[0]}
VNUM2=${VERSION_PARTS[1]}
VNUM3=${VERSION_PARTS[2]}

case "$VERSION_TYPE" in
    major) VNUM1=$((VNUM1 + 1)); VNUM2=0; VNUM3=0;;
    minor) VNUM2=$((VNUM2 + 1)); VNUM3=0;;
    patch) VNUM3=$((VNUM3 + 1));;
esac

NEW_TAG="v$VNUM1.$VNUM2.$VNUM3"
echo "New version: $NEW_TAG"

# Exit if dry run
if [[ "$DRY_RUN" == true ]]; then
    echo ""
    print_color $YELLOW "DRY RUN - No release created"
    echo ""
    echo "To create this release, run:"
    if [[ -n "$CUSTOM_MESSAGE" ]]; then
        echo "./release.sh -v $VERSION_TYPE -m \"$CUSTOM_MESSAGE\""
    else
        echo "./release.sh -v $VERSION_TYPE"
    fi
    exit 0
fi

# Confirm release
echo ""
read -p "Create release $NEW_TAG? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_color $YELLOW "Release cancelled"
    exit 0
fi

# Call the main release script
RELEASE_ARGS="-v $VERSION_TYPE"
if [[ -n "$CUSTOM_MESSAGE" ]]; then
    RELEASE_ARGS="$RELEASE_ARGS -m \"$CUSTOM_MESSAGE\""
fi

echo ""
print_color $BLUE "Calling release script..."
eval "./release.sh $RELEASE_ARGS"