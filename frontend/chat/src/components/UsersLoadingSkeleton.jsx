function UsersLoadingSkeleton() {
    return (
        <div className="space-y-3">

            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="flex items-center gap-3 p-3 border-2 border-base-content"
                >
                    <div className="skeleton w-12 h-12 rounded-full" />

                    <div className="space-y-2 flex-1">
                        <div className="skeleton h-4 w-28" />
                        <div className="skeleton h-3 w-16" />
                    </div>
                </div>
            ))}

        </div>
    );
}

export default UsersLoadingSkeleton;