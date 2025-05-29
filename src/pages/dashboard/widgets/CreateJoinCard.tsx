import Card1 from "../../../components/UI/Input/Card1";

const plus = "Plus.svg";

interface Props {
	className?: string;
}

const CreateJoinCard: React.FC<Props> = ({ className }) => (
	<Card1
		header={"Create / Join Group"}
		className={`pb-[30px] ${className}`}
		isStroked
	>
		<div className="flex justify-end items-end mt-[60px] pr-[31px]">
			<a
				aria-label="create or join"
				href="/dashboard/groups/create"
				className="
        w-[82px] h-[82px] self-center rounded-full shadow-joincircle bg-lightpink
        text-text-100 hover:bg-[#d89c94] flex justify-center items-center ease-in-out duration-700 transition
      "
			>
				<img src={plus} alt="image of plus" className="mt-6 w-[40px]" />
			</a>
		</div>
	</Card1>
);

export default CreateJoinCard;
