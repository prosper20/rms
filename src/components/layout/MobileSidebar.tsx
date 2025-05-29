/* ─────────────────  src/components/layout/MobileSidebar.tsx  ───────────────── */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface MobileSidebarProps {
	open: boolean; // controlled from GlobalLayout
	onClose: () => void; // callback to close drawer (also passed to links)
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onClose }) => (
	<Transition show={open} as={Fragment}>
		{/* Outer modal wrapper */}
		<Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
			{/* Backdrop */}
			<Transition.Child
				as={Fragment}
				enter="ease-in-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black/40" />
			</Transition.Child>

			{/* Drawer */}
			<div className="fixed inset-0 flex">
				<Transition.Child
					as={Fragment}
					enter="transform transition ease-in-out duration-300"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transform transition ease-in-out duration-300"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<Dialog.Panel className="relative w-[320px]">
						{/* close icon */}
						<button
							onClick={onClose}
							className="absolute top-2 text-right right-2 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full"
						>
							<X size={38} />
						</button>

						{/* Re‑use desktop sidebar nav; pass onLinkClick to auto‑close */}
						<DashboardSidebar onLinkClick={onClose} />
					</Dialog.Panel>
				</Transition.Child>
			</div>
		</Dialog>
	</Transition>
);

export default MobileSidebar;

// how to wire it up

// const [drawerOpen, setDrawerOpen] = useState(false);
// …
// <MobileSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />;
