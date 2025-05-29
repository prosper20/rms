// import { useParams } from "react-router-dom";
// import { group1 } from "../utils/utilities";
// import GroupHeader from "../components/GroupHeader";
// import { Fragment } from "react/jsx-runtime";
// import GroupComponents, {
// 	GroupComponent2,
// 	GroupComponent3,
// 	GroupComponent4,
// } from "../components/GroupComponents";

// interface Props {
// 	className?: string;
// }

// const GroupInfo: React.FC<Props> = () => {
// 	const { groups } = useParams();

// 	const value = group1.filter((item) => item.id === groups);
// 	console.log(value, groups);

// 	return (
// 		<div className="flex flex-col gap-[50px] lg:w-[98%]">
// 			{value.map((item) => {
// 				return (
// 					<Fragment key={item.id}>
// 						<header className="mt-[30px] sm:mt-[20px]">
// 							<h1 className="text-[24px] sm:text-[36px] font-header text-text-100">
// 								Project Pioneers Workspace
// 							</h1>
// 						</header>

// 						<GroupHeader image={item.img} text={item.title} />
// 						<GroupComponents
// 							img={item.groupedAvatar}
// 							supervisor={item.supervisor}
// 						/>

// 						<GroupComponent2 desc={item.description} courses={item.courses} />

// 						<div className="border-b-[1px] border-border"></div>

// 						<GroupComponent3 roles={item.roles} />

// 						<div className="border-b-[1px] border-border"></div>

// 						<GroupComponent4 />
// 					</Fragment>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default GroupInfo;
