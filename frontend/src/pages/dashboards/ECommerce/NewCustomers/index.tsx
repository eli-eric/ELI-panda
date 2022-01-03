import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import CustomerItem from "./CustomerItem";
import AppList from "@crema/core/AppList";
import AppScrollbar from "@crema/core/AppScrollbar";
import { NewCustomersData } from "types/models/dashboards/Ecommerce";

interface NewCustomersProps {
  newCustomers: NewCustomersData[];
}

const NewCustomers: React.FC<NewCustomersProps> = ({ newCustomers }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["eCommerce.newCustomers"]}
      contentStyle={{ px: 0 }}
    >
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppList
          data={newCustomers}
          renderRow={(item) => (
            <CustomerItem listStyle="paddingX" key={item.id} item={item} />
          )}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default NewCustomers;
