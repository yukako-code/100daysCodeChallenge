import { useState } from "react";

export const ReactionType = {
    Like: "like",
    Love: "love",
    Funny: "funny",
} as const;

export type ReactionValue = (typeof ReactionType)[keyof typeof ReactionType];

const ReactionCounter: React.FC = () => {
    const [reactions, setReactions] = useState<Record<ReactionValue, number>>({
        [ReactionType.Like]: 0,
        [ReactionType.Love]: 0,
        [ReactionType.Funny]: 0,
    });

    const popularReactionType = Object.keys(reactions).reduce((a, b) => (reactions[a as ReactionValue] > reactions[b as ReactionValue] ? a : b)) as ReactionValue;

    const handleReactionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const reactionType = event.currentTarget.name as ReactionValue;
        setReactions((prevReactions) => ({
            ...prevReactions,
            [reactionType]: prevReactions[reactionType] + 1,
        }));
    };

    return (
        <div className="p-4 space-y-4 text-center">
            <h2 className="text-xl font-bold">リアクションを選んでね！</h2>
            <div className="flex justify-center space-x-4">
                {/* handleReactionClick vs onReactionClick */}
                <button name={ReactionType.Like} onClick={handleReactionClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    👍 {reactions[ReactionType.Like]}
                </button>
                <button name={ReactionType.Love} onClick={handleReactionClick} className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                    ❤️ {reactions[ReactionType.Love]}
                </button>
                <button name={ReactionType.Funny} onClick={handleReactionClick} className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">
                    😂 {reactions[ReactionType.Funny]}
                </button>
            </div>

            <div className="mt-4">
                <p className="text-gray-700">
                    今人気のリアクションは：
                    <span className="font-bold text-indigo-600">{popularReactionType}</span>
                </p>
            </div>
        </div>
    );
};

export default ReactionCounter;