import React from "react";
import AppCard from "@crema/core/AppCard";
import AppList from "@crema/core/AppList";
import LearningItem from "./LearningItem";
import { useIntl } from "react-intl";
import { LearningData } from "types/models/dashboards/Academy";

interface MyLearningProps {
  learningData: LearningData[];
}

const MyLearning: React.FC<MyLearningProps> = ({ learningData }) => {
  const { messages } = useIntl();
  return (
    <AppCard title={messages["academy.myLearning"]} contentStyle={{ px: 0 }}>
      <AppList
        animation="transition.slideRightBigIn"
        data={learningData}
        renderRow={(data, index) => <LearningItem key={index} course={data} />}
      />
    </AppCard>
  );
};

export default MyLearning;
