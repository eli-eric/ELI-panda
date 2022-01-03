import React from "react";
import AppList from "@crema/core/AppList";
import AppCard from "@crema/core/AppCard";
import SuggestionItem from "./SuggestionItem";
import { useIntl } from "react-intl";
import { SuggestionObj } from "types/models/apps/Wall";

interface SuggestionsProps {
  suggestions: SuggestionObj[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["wall.suggestions"]}
      contentStyle={{ px: 0, pt: 2 }}
    >
      <AppList
        data={suggestions}
        renderRow={(item, index) => <SuggestionItem key={index} item={item} />}
      />
    </AppCard>
  );
};

export default Suggestions;
