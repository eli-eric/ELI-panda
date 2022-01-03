import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppCard from "@crema/core/AppCard";
import AppGrid from "@crema/core/AppGrid";
import { useIntl } from "react-intl";
import MediaViewer from "@crema/core/AppMedialViewer";
import clsx from "clsx";
import PropTypes from "prop-types";
import { ImageObj } from "types/models/apps/Wall";

const StyledImage = styled("img")(() => ({
  borderRadius: 16,
  display: "block",
  width: "100%",
  cursor: "pointer",
}));

interface PhotosProps {
  photos: ImageObj[];
}

const Photos: React.FC<PhotosProps> = ({ photos }) => {
  const [index, setIndex] = useState(-1);

  const onClose = () => {
    setIndex(-1);
  };
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      title={messages["wall.photos"]}
      action={messages["common.viewAll"]}
    >
      <div>
        <AppGrid
          data={photos}
          column={3}
          itemPadding={4}
          responsive={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
          }}
          renderRow={(photo, index) => (
            <StyledImage
              onClick={() => setIndex(index)}
              className={clsx("card-hover")}
              key={index}
              src={photo.thumb}
              alt="user"
            />
          )}
        />
      </div>
      <MediaViewer
        index={index}
        medias={photos.map((data) => {
          return {
            url: data.thumb,
            mime_type: "image/*",
          };
        })}
        onClose={onClose}
      />
    </AppCard>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
