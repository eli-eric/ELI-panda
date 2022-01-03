import React from "react";
import ReviewItem from "./ReviewItem";
import AppList from "@crema/core/AppList";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import AppScrollbar from "@crema/core/AppScrollbar";
import { ReviewsList } from "types/models/dashboards/Widgets";

interface ReviewsProps {
  data: ReviewsList[];
}

const Reviews: React.FC<ReviewsProps> = ({ data }) => {
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["common.reviews"]}
      contentStyle={{ px: 0 }}
    >
      <AppScrollbar
        sx={{
          height: { xs: 362, xl: 316 },
        }}
      >
        <AppList
          data={data}
          renderRow={(item) => {
            return <ReviewItem key={item.id} item={item} />;
          }}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default Reviews;
