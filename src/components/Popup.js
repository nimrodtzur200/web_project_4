export default class Popup {
    constructor(popupSelector) {
        // this._popupSelector = popupSelector; 
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector(".popup__close-button");
    }

    _handleEscClose = (evt) => {
        if (evt.key == "Escape") {
            this.close();
        }
    };

    _handleRemoteClickClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener("click", () => {
            this.close();
        });
        this._popup.addEventListener("mousedown", (evt) => {
            this._handleRemoteClickClose(evt);
        });
    }
}