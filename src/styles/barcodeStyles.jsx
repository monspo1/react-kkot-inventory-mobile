import { StyleSheet } from "react-native";

export default function barcodeStyles() {
  
  const barcodeStyles = StyleSheet.create({
    barcodeContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    barcodeDialogStyle: {
      alignItems: 'center', padding: 20, 
    },
    barcodeDialogBarcodeTextStyle: { fontSize: 45, lineHeight: 45, color: 'orange' },
    barcodeDialogMessageStyle: { fontSize: 25, marginBottom: 30 },
    barcodeDialogBarcodeErrorStyle: { fontSize: 25, color: '#800000' },
    barcodeLayerTop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)'
    },
    barcodeLayerCenter: {
      flex: 2,
      flexDirection: 'row'
    },
    barcodeLayerLeft: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)'
    },
    barcodeFocused: {
      flex: 10
    },
    barcodeLayerRight: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)'
    },
    barcodeLayerBottom: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)'
    },
  });

  return barcodeStyles;
}
