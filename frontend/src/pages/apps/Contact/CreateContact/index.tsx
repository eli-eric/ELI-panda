import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  onCreateContact,
  onUpdateSelectedContact,
} from "../../../../redux/actions/ContactApp";
import IntlMessages from "@crema/utility/IntlMessages";
import AddContactForm from "./AddContactForm";
import AppDialog from "@crema/core/AppDialog";
import { ContactObj } from "../../../../types/models/apps/Contact";

const validationSchema = yup.object({
  name: yup
    .string()
    .required(String(<IntlMessages id="validation.nameRequired" />)),
  email: yup
    .string()
    .email(String(<IntlMessages id="validation.emailFormat" />))
    .required(String(<IntlMessages id="validation.emailRequired" />)),
  contact: yup
    .string()
    .required(String(<IntlMessages id="validation.phoneNumberRequired" />)),
});

interface CreateContactProps {
  isAddContact: boolean;
  handleAddContactClose: () => void;
  selectContact?: ContactObj | null;
  onUpdateContact?: (newContact: ContactObj) => void;
}

const CreateContact: React.FC<CreateContactProps> = ({
  isAddContact,
  handleAddContactClose,
  selectContact,
  onUpdateContact,
}) => {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState(
    selectContact && selectContact.image
      ? selectContact.image
      : "/assets/images/placeholder.jpg"
  );
  useEffect(() => {
    setUserImage(
      selectContact && selectContact.image
        ? selectContact.image
        : "/assets/images/placeholder.jpg"
    );
  }, [selectContact]);

  return (
    <AppDialog
      fullHeight
      open={isAddContact}
      onClose={() => handleAddContactClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectContact ? selectContact.name : "",
          email: selectContact ? selectContact.email : "",
          contact: selectContact ? selectContact.contact : "",
          birthday:
            selectContact && selectContact.birthday
              ? selectContact.birthday
              : null,
          website:
            selectContact && selectContact.website ? selectContact.website : "",
          company:
            selectContact && selectContact.company ? selectContact.company : "",
          address:
            selectContact && selectContact.address ? selectContact.address : "",
          facebookId:
            selectContact && selectContact.facebookId
              ? selectContact.facebookId
              : "",
          twitterId:
            selectContact && selectContact.twitterId
              ? selectContact.twitterId
              : "",
          notes:
            selectContact && selectContact.notes ? selectContact.notes : "",
          label:
            selectContact && selectContact.label ? selectContact.label : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectContact) {
            const newContact = {
              id: selectContact.id,
              isStarred: selectContact.isStarred,
              isFrequent: selectContact.isFrequent,
              image: userImage,
              ...data,
            };
            dispatch(onUpdateSelectedContact(newContact as ContactObj));
            onUpdateContact!(newContact as ContactObj);
          } else {
            const newContact = {
              id: Math.floor(Math.random() * 1000),
              isStarred: false,
              isFrequent: Math.random() > 0.5,
              image: userImage,
              ...data,
            };
            dispatch(onCreateContact(newContact as ContactObj));
          }
          handleAddContactClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddContactForm
            setUserImage={setUserImage}
            userImage={userImage}
            values={values as ContactObj}
            setFieldValue={setFieldValue}
            handleAddContactClose={handleAddContactClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateContact;
