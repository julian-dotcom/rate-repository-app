import CreateReviewForm from "./CreateReviewForm";
import { Formik } from "formik";
import * as yup from "yup";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { NewReview } from "../config/types";
import { useNavigate } from "react-router-native";
const MIN_LENGTH = 2;

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (review: NewReview) => {
    const parsed = { ...review, rating: Number(review.rating) };
    try {
      const { data } = await mutate({
        variables: {
          review: parsed,
        },
      });
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={{ ownerName: "", repositoryName: "", rating: "", text: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm handleSubmit={handleSubmit} />}
    </Formik>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(MIN_LENGTH, `Repository owner must be at least ${MIN_LENGTH} characters`)
    .required("Repository owner is required"),
  repositoryName: yup
    .string()
    .min(MIN_LENGTH, `Repository name must be at least ${MIN_LENGTH} characters`)
    .required("Repository name is required"),
  rating: yup
    .number()
    .min(0, `Rating must be between 0 and 100`)
    .max(100, `Rating must be between 0 and 100`)
    .required("Rating is required"),
  text: yup.string(),
});

export default CreateReview;
