function MessagesLoadingSkeleton() {
    return (
        <div className="max-w-3xl mx-auto space-y-5">

            {[1, 2, 3, 4, 5].map((item) => (
                <div
                    key={item}
                    className={`chat ${
                        item % 2 === 0
                            ? "chat-end"
                            : "chat-start"
                    }`}
                >
                    <div className="skeleton h-12 w-40 border-2 border-base-content" />
                </div>
            ))}

        </div>
    );
}

export default MessagesLoadingSkeleton;