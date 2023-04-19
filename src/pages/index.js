import "./index.css";
import { Card } from "./../components/Card.js";
import { UserInfo } from "./../components/UserInfo.js";
import { FormValidator } from "./../components/FormValidator.js";
import { Section } from "./../components/Section.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { PopupWithImage } from "./../components/PopupWithImage.js";
import {
    formValidators,
    profileName,
    profileDescription,
    nameSelector,
    jobSelector,
    initialCards,
    profileEditButton,
    nameText,
    aboutmeText,
    cardCreationButton,
    element,
} from "../utils/constants.js";

const cardList = new Section({
        data: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item.link, item.name);
            cardList.addItem(cardElement);
        },
    },
    ".element"
);
cardList.renderer();
const profileForm = new PopupWithForm("#editProfile", (formData) => {
    
    userProfileInfo.setUserInfo({
        name: formData.name,
        job: formData.aboutme,
    });
});
profileForm.setEventListeners();

const addCardForm = new PopupWithForm("#createCardPopup", (formData) => {
    const cardElement = createCard(formData.imagelink, formData.title);
    cardList.prependItem(cardElement);
});
addCardForm.setEventListeners();

const popupWithImage = new PopupWithImage("#picturePopup");
popupWithImage.setEventListeners();

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config);
       
        const formName = formElement.getAttribute("name");

        
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
});

const userProfileInfo = new UserInfo({
    // userName: profileName,
    // userJob: profileDescription,
    userName: nameSelector,
    userJob: jobSelector,
});

userProfileInfo.setUserInfo({
    name: "Jacques Cousteau",
    job: "Explorer",
});

function createCard(link, name) {
    const cardObj = new Card({ imgLink: link, title: name },
        "#template",
        ({ imgSrc, imgAlt }) => {
            popupWithImage.open({
                imgSrc: imgSrc,
                imgAlt: imgAlt,
            });
        }
    );
    const newCard = cardObj.generateCard();
    // console.log(newCard);
    return newCard;
    
}



profileEditButton.addEventListener("click", () => {
    const userInfo = userProfileInfo.getUserInfo();
    nameText.value = userInfo.userName;
    aboutmeText.value = userInfo.userJob;

    profileForm.open();
});


cardCreationButton.addEventListener("click", () => {
    formValidators[createCardForm.getAttribute("name")].resetValidation();
    addCardForm.open();
});