import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Gallery from "react-photo-gallery";
import photos from "../../../@crema/services/db/gallery/photos";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";
import AppAnimate from "../../../@crema/core/AppAnimate";

const tabs = [
  { id: 323, name: <IntlMessages id="common.all" /> },
  { id: 333, name: <IntlMessages id="portfolio.logo" /> },
  { id: 32323, name: <IntlMessages id="portfolio.painting" /> },
  { id: 421, name: <IntlMessages id="portfolio.graphicDesign" /> },
  { id: 4454, name: <IntlMessages id="portfolio.webDesign" /> },
  { id: 221, name: <IntlMessages id="portfolio.ui" /> },
];

const Portfolio = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const shuffle = (arra1: any) => {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  };

  const a11yProps = (index: number) => {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  };

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box flex={1}>
        <Box mx="auto" textAlign="center" maxWidth={672}>
          <Box mb={6}>
            <Box
              component="h2"
              color="text.primary"
              mb={4}
              fontWeight={Fonts.MEDIUM}
              fontSize={20}
            >
              <IntlMessages id="portfolio.heading" />
            </Box>
            <Box component="p" color="text.secondary" mb={3}>
              <IntlMessages id="portfolio.content" />
            </Box>
          </Box>

          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{
              marginBottom: 5,
              position: "relative",
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            {tabs.map((tab, index) => {
              return (
                <Tab
                  key={tab.id}
                  sx={{
                    minWidth: 10,
                    fontSize: 16,
                    textTransform: "capitalize",
                  }}
                  label={tab.name}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        </Box>

        <Box
          sx={{
            position: "relative",
            marginBottom: 5,
          }}
        >
          {value === 0 && (
            <Gallery margin={10} photos={shuffle(photos)} direction="column" />
          )}
          {value === 1 && (
            <Gallery margin={10} photos={shuffle(photos)} direction="column" />
          )}
          {value === 2 && (
            <Gallery margin={10} photos={shuffle(photos)} direction="column" />
          )}
          {value === 3 && (
            <Gallery margin={10} photos={shuffle(photos)} direction="column" />
          )}
          {value === 4 && (
            <Gallery margin={10} photos={shuffle(photos)} direction="column" />
          )}
          {value === 5 && (
            <Gallery margin={10} photos={shuffle(photos)} direction="column" />
          )}
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Portfolio;
