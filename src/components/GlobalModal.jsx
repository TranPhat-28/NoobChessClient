import { useSelector } from "react-redux";

const GlobalModal = () => {
    const globalModal = useSelector((state) => state.globalModal);
    const { title, description, img } = globalModal;

    return (
        <dialog id="globalModal" className="modal">
            <div className="modal-box flex flex-col items-center">
                {img !== "" && <img src={img} />}
                <p className="font-bold text-2xl p-2 text-center">{title}</p>
                <p className="text-xl p-2 text-center">{description}</p>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default GlobalModal;
