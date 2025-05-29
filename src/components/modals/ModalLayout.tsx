import { useEffect, useRef, useState } from "react";

interface Props {
	children: React.ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

const TaskModal: React.FC<Props> = ({ children, isOpen, onClose }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	// Track if we've mounted the component to help with initialization
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || !isMounted) return;

		const handleClose = () => {
			// When the dialog closes, notify parent
			onClose?.();
		};

		// Clean up event listeners
		dialog.removeEventListener("close", handleClose);
		dialog.addEventListener("close", handleClose);

		// Force the dialog state to match the desired state
		if (isOpen) {
			// Using setTimeout to ensure this runs after React's rendering cycle
			setTimeout(() => {
				if (dialog && !dialog.open) {
					try {
						dialog.showModal();
					} catch (e) {
						console.error("Failed to open dialog:", e);
					}
				}
			}, 0);
		} else {
			if (dialog.open) {
				dialog.close();
			}
		}

		return () => {
			if (dialog) {
				dialog.removeEventListener("close", handleClose);
			}
		};
	}, [isOpen, onClose, isMounted]);

	const handleBackdropClick = () => {
		const dialog = dialogRef.current;
		if (dialog) {
			dialog.close();
		}
	};

	return (
		<dialog ref={dialogRef} className="p-0 bg-transparent">
			{/* Wrapper that acts like backdrop */}
			<div
				className="fixed inset-0 bg-black/50 flex items-center justify-center"
				onClick={handleBackdropClick}
			>
				{/* Modal content itself */}
				<div
					className="bg-background-100 p-6 md:p-20 rounded-lg shadow-lg max-h-[90vh] overflow-auto w-[90%] md:w-[850px]"
					onClick={(e) => e.stopPropagation()} // stop click inside modal
				>
					{children}
				</div>
			</div>
		</dialog>
	);
};

export default TaskModal;
