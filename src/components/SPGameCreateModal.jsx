import useGameCreation from "../hooks/GameCreation";

const SPGameCreateModal = () => {
    // Game Creation Hooks
    const { CreateSinglePlayerGameNoAuth } = useGameCreation();

    // If User click Play
    const actionAccepted = () => {
        CreateSinglePlayerGameNoAuth();
    };

    // If User click Cancel
    const actionDenied = () => {
        document.getElementById("spGameCreateModal").close();
    };

    return (
        <dialog id="spGameCreateModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Warning</h3>
                <p className="py-4">
                    You are not logged in. Your progress will not be recorded.
                    Continue?
                </p>
                <div className="modal-action">
                    <button
                        className="btn btn-outline btn-primary"
                        onClick={actionAccepted}
                    >
                        Play
                    </button>
                    <button
                        className="btn btn-outline btn-error"
                        onClick={actionDenied}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default SPGameCreateModal;
