const InGameProfile = () => {
    return (
        <div className="stats shadow w-full">
            <div className="stat">
                <div className="stat-title font-bold text-lg">Username</div>
                <div className="stat-value">89%</div>
                <div className="stat-desc">Win rate accumulated</div>
                <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InGameProfile;
