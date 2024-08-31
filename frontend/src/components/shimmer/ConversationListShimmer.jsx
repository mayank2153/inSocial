import ConvoShimmer from "./coversationShimmer";

const ConversationShimmer = () => (
    <ul>
        {Array(5).fill().map((_, index) => (
            <li key={index}>
                <div className="mb-2 ml-6">
                    <ConvoShimmer />
                </div>
            </li>
        ))}
    </ul>
);

export default ConversationShimmer
