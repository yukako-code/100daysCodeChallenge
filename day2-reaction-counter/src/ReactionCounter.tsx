import { useMemo, useState } from "react";
import ReactionButton from "./ReactionButton";

export const ReactionType = {
    Like: "like",
    Love: "love",
    Funny: "funny",
} as const;

export type ReactionValue = (typeof ReactionType)[keyof typeof ReactionType];

export type ButtonProps = {
    name: ReactionValue;
    text: string;
    bgColor: string;
    bgHoverColor: string;
}

const buttons: Array<ButtonProps> = [
    {
        name: ReactionType.Like,
        text: "👍",
        bgColor: 'bg-blue-500',
        bgHoverColor: 'bg-blue-600',
    },
    {
        name: ReactionType.Love,
        text: "❤️",
        bgColor: 'bg-pink-500',
        bgHoverColor: 'bg-pink-600',
    },
    {
        name: ReactionType.Funny,
        text: "😂",
        bgColor: 'bg-yellow-400',
        bgHoverColor: 'bg-yellow-500',
    }
]

const ReactionCounter: React.FC = () => {
    const [reactions, setReactions] = useState<Record<ReactionValue, number>>({
        [ReactionType.Like]: 0,
        [ReactionType.Love]: 0,
        [ReactionType.Funny]: 0,
    });

    const popularReactionType = useMemo(() => {
        return Object.entries(reactions).reduce(
            (a, b) => (b[1] > a[1] ? b : a)
        )[0] as ReactionValue;
    }, [reactions]);

    const handleReactionClick = (reactionType: ReactionValue) => {
        setReactions((prevReactions) => ({
            ...prevReactions,
            [reactionType]: prevReactions[reactionType] + 1,
        }));
    };

    return (
        <div className="p-4 space-y-4 text-center">
            <h2 className="text-xl font-bold">リアクションを選んでね！</h2>
            <div className="flex justify-center space-x-4">
                {
                    buttons.map(({ name, text, ...props }) => (
                        <ReactionButton
                            key={name}
                            name={name}
                            onClickReaction={handleReactionClick}
                            text={`${text} ${reactions[name]}`}
                            {...props}
                        />
                    ))
                }
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