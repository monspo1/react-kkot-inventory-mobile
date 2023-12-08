import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Button, Dialog, Text } from "react-native-paper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getUniqueId } from "../utils/helper";
import barcodeStyles from "../styles/barcodeStyles";
import customStyles from "../styles/customStyles";

const BarcodeScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [barcode, setBarcode] = useState("30000059708");
  const [barcode, setBarcode] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isNoResult, setIsNoResult] = useState(false);
  const curBoxInitial = useSelector((state) => state.curBoxInitial);
  const stylesForBarcode = barcodeStyles();
  const styles = customStyles();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setFetchError(false);
    setBarcode(null);
    setIsNoResult(false);
    navigation.goBack();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setVisible(true);
    setIsNoResult(false);
    setBarcode(data);
  };

  const onAccept = async () => {
    // console.log("---------- ACCEPT BTN -------- "); 8809 2380 09470
    try {
      const masterItems = collection(db, "master-items");
      const q = query(masterItems, where("barcode", "==", barcode));
      const querySnapshot = await getDocs(q);
      let foundItem;
      querySnapshot.forEach((doc) => {
        foundItem = { ...doc.data(), id: doc.id };
      });
      // console.log('curBoxInitial: ', curBoxInitial)
      console.log("received: ", foundItem);

      if (foundItem) {
        setIsNoResult(false);

        const existingObj = {
          box_id: curBoxInitial, // <= Check!!! 전달된 box_id 필요
          item_id: `item-${getUniqueId()}`,
          item_barcode: barcode,
          item_brand: foundItem.brand ? foundItem.brand : "",
          item_content: foundItem.content ? foundItem.content : "",
          item_expiration: null,
          item_weight_oz: foundItem.item_weight_oz
            ? foundItem.item_weight_oz
            : "",
          item_weight_lbs: foundItem.item_weight_lbs
            ? foundItem.item_weight_lbs
            : "",
          item_weight_g: foundItem.item_weight_g ? foundItem.item_weight_g : "",
          item_price: foundItem.item_price ? foundItem.item_price : "",
          item_category: foundItem.category ? foundItem.category : null,
          item_count: "1",
        };
        navigation.reset({
          index: 2,
          routes: [
            { name: "HomeScreen" },
            { name: "ItemListScreen" },
            { name: "ItemDetailScreen", params: { itemSelected: existingObj } },
          ],
        });
      } else {
        setIsNoResult(true);
      }
      setFetchError(false);
    } catch (error) {
      console.error("Error fetching item data: ", error);
      setFetchError(true);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={stylesForBarcode.barcodeContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={stylesForBarcode.barcodeLayerTop} />
      <View style={stylesForBarcode.barcodeLayerCenter}>
        <View style={stylesForBarcode.barcodeLayerLeft} />
        <View style={stylesForBarcode.barcodeFocused} />
        <View style={stylesForBarcode.barcodeLayerRight} />
      </View>
      <View style={stylesForBarcode.layerBottom} />
      {
        //scanned &&
        // <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      }
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ margin: 50, padding: 15 }}
      >
        {/* <Dialog.Title>Scanned barcode: </Dialog.Title> */}
        <Dialog.Content>
          {isNoResult ? (
            <View style={stylesForBarcode.barcodeDialogStyle}>
              <Text style={stylesForBarcode.barcodeDialogMessageStyle}>
                No record found in DB.
              </Text>
              <Text style={stylesForBarcode.barcodeDialogMessageStyle}>
                If it's a new item, plz contact 수녀님.
              </Text>
            </View>
          ) : (
            <View style={stylesForBarcode.barcodeDialogStyle}>
              <Text style={stylesForBarcode.barcodeDialogMessageStyle}>
                Scanned barcode correct?{" "}
              </Text>
              <Text style={stylesForBarcode.barcodeDialogBarcodeTextStyle}>
                {barcode}
              </Text>
            </View>
          )}
          {fetchError && (
            <View style={stylesForBarcode.barcodeDialogStyle}>
              <Text style={stylesForBarcode.barcodeDialogBarcodeErrorStyle}>
                Network error to fetch the scanned item from DB
              </Text>
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            icon="window-close"
            mode="contained-tonal"
            labelStyle={styles.bigButtonLabelStyle}
            style={[styles.bigButtonStyle, { margin: 20, width: "30%" }]}
            onPress={hideDialog}
          >
            Cancel
          </Button>
          <Button
            icon="replay"
            mode="contained-tonal"
            labelStyle={styles.bigButtonLabelStyle}
            style={[styles.bigButtonStyle, { margin: 20, width: "30%" }]}
            onPress={() => setScanned(false)}
          >
            Retake
          </Button>
          <Button
            icon="check-bold"
            mode="contained-tonal"
            labelStyle={styles.bigButtonLabelStyle}
            style={[styles.bigButtonStyle, { margin: 20, width: "30%" }]}
            onPress={onAccept}
            disabled={isNoResult || fetchError}
          >
            Accept
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default BarcodeScreen;
