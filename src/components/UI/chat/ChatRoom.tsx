import { Outlet, useParams } from "react-router-dom";

const ChatRoom = () => {
	const { conversationId } = useParams();

	return <Outlet context={{ conversationId }} />;
};

export default ChatRoom;
