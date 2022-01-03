import React from "react";
import AppAnimate from "../../../@crema/core/AppAnimate";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import AppTableContainer from "../../../@crema/core/AppTableContainer";
import { Fonts } from "../../../shared/constants/AppEnums";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import invoiceData from "../../../@crema/services/db/extraPages/invoice/invoiceData";
import Header from "./Header";
import ItemList from "./ItemList";
import { Typography } from "@mui/material";

const Invoice3 = () => {
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, maxWidth: 900, width: "100%" }}>
          <Card
            sx={{
              py: { xs: 6, xl: 8 },
              minHeight: 1200,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ px: { xs: 6, xl: 8 } }}>
              <Header />
            </Box>
            <Box sx={{ mb: 5 }}>
              <AppTableContainer>
                <ItemList />
              </AppTableContainer>
            </Box>

            <Box
              sx={{
                mt: "auto",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { md: "space-between" },
                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                pt: 4,
              }}
            >
              <Box
                sx={{
                  px: { xs: 6, xl: 8 },
                }}
              >
                <Box
                  component="h4"
                  sx={{
                    mb: 5,
                    color: "text.secondary",
                    textAlign: "center",
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
                  <IntlMessages id="invoice.thankYou" />
                </Box>
                <Box
                  sx={{
                    display: { xs: "flex", md: "inherit" },
                    flexDirection: { xs: "column", md: "inherit" },
                    alignItems: { xs: "center", md: "inherit" },
                    justifyContent: { xs: "center", md: "inherit" },
                    mb: { xs: 5, md: 0 },
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: 16,
                      fontWeight: Fonts.BOLD,
                      mb: 3,
                    }}
                  >
                    <IntlMessages id="invoice.paymentInfo" />
                  </Typography>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: 120,
                        }}
                      >
                        <IntlMessages id="invoice.accountNumber" />:
                      </Box>
                      <Box component="span">{invoiceData.company.name}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: 120,
                        }}
                      >
                        <IntlMessages id="invoice.accountName" />:
                      </Box>
                      <Box component="span">{invoiceData.company.name}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: 120,
                        }}
                      >
                        <IntlMessages id="invoice.ifscCode" />:
                      </Box>
                      <Box component="span">{invoiceData.company.address2}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AppTableContainer
                  sxStyle={{
                    width: { xs: "auto", md: "100%" },
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "0 none", px: { xs: 6, xl: 8 }, py: 1 }}
                      >
                        <Box
                          sx={{
                            textAlign: "right",
                            mr: 10,
                            color: "text.secondary",
                            fontSize: 14,
                            fontWeight: Fonts.REGULAR,
                          }}
                        >
                          <IntlMessages id="invoice.subTotal" />:
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{ border: "0 none", px: { xs: 6, xl: 8 }, py: 1 }}
                      >
                        <Box
                          sx={{
                            color: "text.primary",
                            fontSize: 16,
                            fontWeight: Fonts.MEDIUM,
                          }}
                        >
                          ${invoiceData.subTotal}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "0 none", px: { xs: 6, xl: 8 }, py: 1 }}
                      >
                        <Box
                          sx={{
                            color: "text.secondary",
                            textAlign: "right",
                            mr: 10,
                            fontSize: 14,
                            fontWeight: Fonts.REGULAR,
                          }}
                        >
                          <IntlMessages id="invoice.discountAmount" />:
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{ border: "0 none", px: { xs: 6, xl: 8 }, py: 1 }}
                      >
                        <Box
                          sx={{
                            color: "text.primary",
                            fontSize: 16,
                            fontWeight: Fonts.MEDIUM,
                          }}
                        >
                          ${invoiceData.rebate}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          border: "0 none",
                          px: { xs: 6, xl: 8 },
                          pt: 1,
                          pb: 5,
                        }}
                      >
                        <Box
                          sx={{
                            color: "text.secondary",
                            textAlign: "right",
                            mr: 10,
                            fontSize: 14,
                            fontWeight: Fonts.REGULAR,
                          }}
                        >
                          <IntlMessages id="invoice.gSTTaxVAT" />:
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "0 none",
                          px: { xs: 6, xl: 8 },
                          pt: 1,
                          pb: 5,
                        }}
                      >
                        <Box
                          sx={{
                            color: "text.primary",
                            fontSize: 16,
                            fontWeight: Fonts.MEDIUM,
                          }}
                        >
                          ${invoiceData.rebate}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          border: "0 none",
                          px: { xs: 6, xl: 8 },
                          py: 2,
                        }}
                      >
                        <Box
                          sx={{
                            textAlign: "right",
                            mr: 10,
                            fontSize: 14,
                            fontWeight: Fonts.REGULAR,
                          }}
                        >
                          <IntlMessages id="invoice.grandTotal" />:
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "0 none",
                          px: { xs: 6, xl: 8 },
                          py: 2,
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 16,
                            fontWeight: Fonts.MEDIUM,
                          }}
                        >
                          ${invoiceData.subTotal}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </AppTableContainer>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Invoice3;
