import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, TextInput, Divider, RadioButton, HelperText } from 'react-native-paper';
import { View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setBoxItems } from '../actions/action'
import { itemCategoryArr } from '../constants/constants'
import { getCategoryColors, getUniqueId } from '../utils/helper';
import customStyles from '../styles/customStyles' 
import moment from 'moment'


const ItemDetailScreen = ({ route, navigation }) => {
    const { itemSelected } = route.params;
    const dispatch = useDispatch()
    const styles = customStyles();
    const minDate = '2020-01-01';
    const maxDate = '2100-12-31';
        
    // const elem = route.params; 
    // const windowWidth = useWindowDimensions().width;
    const curBoxItems = useSelector(state => state.curBoxItems);
    const curBoxId = useSelector(state => state.curBoxId);
    
    const [textForBarcode, setTextForBarcode] = useState(itemSelected.item_barcode)
    const [textForBrand, setTextForBrand] = useState(itemSelected.item_brand)
    const [textForContent, setTextForContent] = useState(itemSelected.item_content)
    const [textForWeightOz, setTextForWeightOz] = useState(itemSelected.item_weight_oz)
    const [textForWeightLbs, setTextForWeightLbs] = useState(itemSelected.item_weight_lbs)
    const [textForWeightG, setTextForWeightG] = useState(itemSelected.item_weight_g)
    const [textForPrice, setTextForPrice] = useState(itemSelected.item_price)
    const [textForItemCount, setTextForItemCount] = useState(itemSelected.item_count)
    const [textForExpiration, setTextForExpiration] = useState(null)
    const [checkedRadioBtnForCategory, setCheckedRadioBtnForCategory] = useState(null);
    const [barcodeError, setBarcodeError] = useState(false);
    const [brandError, setBrandError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [weightError, setWeightError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [itemCountError, setItemCountError] = useState(false);
    const [expirationError, setExpirationError] = useState(false);
    
    // console.log('itemSelected: ', itemSelected)
    /*
    itemSelected:  {
        "item_barcode": "092384123-32841",
        "item_brand": "NIPRO", 
        "item_category": "Pastas / Noodles", 
        "item_content": "Hoisan sauce", 
        "item_count": 3, 
        "item_expiration": "2025-08-14T05:00:00.000Z",
        "item_price": "11.98", 
        "item_weight_g": "3.49",
        "item_weight_lbs": "11.23",
        "item_weight_oz": "35.98", 
        "box_id": "key-asdfas-1"
    }
    */
    
    useEffect(() => {
        if (itemSelected) {
            if(itemSelected.item_expiration) {
                setTextForExpiration(new Date(itemSelected.item_expiration))
            }
            if (itemSelected.item_category) {
                const targetRadio = getItemValueByLabel(itemSelected.item_category)
                setCheckedRadioBtnForCategory(targetRadio)
            }
            if(itemSelected.item_count){
                setTextForItemCount(itemSelected.item_count.toString())
            }
        }
    }, [itemSelected]);
 
    const handleBarcodeChange = (value) => {
        setTextForBarcode(value);
        setBarcodeError(value === "");
    };

    const handleBrandChange = (value) => {
        setTextForBrand(value);
        setBrandError(value === "");
    };

    const handleContentChange = (value) => {
        setTextForContent(value);
        setContentError(value === "");
    };

    const handleWeightChange = (unit, val) => {
        setWeightError(val === "" || isNaN(val))
        switch(unit) {
            case 'lbs':
                setTextForWeightOz((Number(val) * 16).toFixed(2).toString())
                setTextForWeightLbs(val)
                setTextForWeightG((Number(val) * 453.592).toFixed(2).toString())
                break;
            case 'oz':
                setTextForWeightOz(val)
                setTextForWeightLbs((Number(val) * 0.0625).toFixed(2).toString())
                setTextForWeightG((Number(val) * 28.3495).toFixed(2).toString())
                break;
            case 'g':
                setTextForWeightOz((Number(val) * 0.035274).toFixed(2).toString())
                setTextForWeightLbs((Number(val) * 0.0022).toFixed(2).toString())
                setTextForWeightG(val)
                break;
        }   
    }
    
    const handleItemCountChange = (value) => {
        setTextForItemCount(value)
        setItemCountError(value < 0 || isNaN(value))
    }

    const handleExpirationChange = (value) => {
        setTextForExpiration(value);
        
        const selectedDate = moment(value);
        if (!selectedDate.isValid() || selectedDate.isBefore(moment(minDate)) || selectedDate.isAfter(moment(maxDate))) {
            setExpirationError(true);
        } else {
            setExpirationError(false);
        }
        // https://stackoverflow.com/questions/71216463/allowing-null-value-for-react-native-datetimepicker
    };

    const checkExpirationError = (value) => {
        let err = (value === "") || isNaN(value) || value === null;
        if (err) {
            setExpirationError(true);
            return;
        }

        const momentedVal = moment(value);
        err = !momentedVal.isValid() || momentedVal.isBefore(moment(minDate)) || momentedVal.isAfter(moment(maxDate));
        setExpirationError(err);
    }


    const handlePriceChange = (value) => {
        setTextForPrice(value);
        setPriceError(value === "" || isNaN(value));
    };

    const getItemLabelByValue = (value) => {
        const found = itemCategoryArr.find(item => item.value === value);
        return found ? found.label : null;
    }

    const getItemValueByLabel = (label) => {
        const found = itemCategoryArr.find(item => item.label === label);
        return found ? found.value : null;
    }

    const submitItemDetails = () => {
        const resObj = {
            box_id: curBoxId,
            item_id: itemSelected.item_id,
            item_barcode: textForBarcode,
            item_brand: textForBrand,
            item_content: textForContent,
            item_expiration: textForExpiration.toISOString(),
            item_weight_oz: textForWeightOz,
            item_weight_lbs: textForWeightLbs,
            item_weight_g: textForWeightG,
            item_price: textForPrice,
            item_count: textForItemCount,
            item_category: getItemLabelByValue(checkedRadioBtnForCategory)
        }

        let newBoxItems = [...curBoxItems];
        const index = newBoxItems.findIndex(item => item.item_id === resObj.item_id);
        if (index !== -1) newBoxItems[index] = resObj;
        else newBoxItems.push(resObj);
        dispatch(setBoxItems(newBoxItems));
        navigation.navigate('ItemListScreen')
    }
    
    const shouldDisableSubmitBtn = () => {
        return (barcodeError || brandError || contentError || weightError || priceError || !checkedRadioBtnForCategory
            || textForBarcode === "" || textForContent === "" || textForWeightOz === "" || textForItemCount === ""
            || checkedRadioBtnForCategory === null
        );
    }

    return (<>
    {/* //style={{ flex: 1, backgroundColor: "#fff" }} 
            // contentContainerStyle={{ justifyContent: "flex-start", alignItems: "stretch" }}     */}
        <SafeAreaProvider>
            <ScrollView 
            >
                {/* <View style={{ marginTop: 20, }}>
                    <Text style={styles.itemDetailHeadline}>IMAGE</Text>
                </View> */}

                <View style={{ marginTop: 20, }}>
                    <Text style={styles.itemDetailHeadline}>BARCODE</Text>
                    <TextInput textColor="#333"
                        style={styles.addNewBoxModalTextInput}
                        value={textForBarcode}
                        onChangeText={handleBarcodeChange}
                        placeholder="Enter a barcode"
                    />
                     <HelperText type="error" visible={barcodeError} style={styles.itemDetailHelperTextStyle}>
                        Barcode is NOT valid! & should not be empty
                    </HelperText>
                </View>

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.itemDetailHeadline}>BRAND</Text>
                    <TextInput textColor="#333"
                        style={styles.addNewBoxModalTextInput}
                        value={textForBrand}
                        onChangeText={handleBrandChange}
                        placeholder="Enter a brand name"
                    />
                    <HelperText type="error" visible={brandError} style={styles.itemDetailHelperTextStyle}>
                        Brand is NOT valid! & should not be empty
                    </HelperText>
                </View>

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.itemDetailHeadline}>CONTENT</Text>
                    <TextInput textColor="#333"
                        style={styles.addNewBoxModalTextInput}
                        value={textForContent}
                        onChangeText={handleContentChange}
                        placeholder="Enter contents"
                    />
                    <HelperText type="error" visible={contentError} style={styles.itemDetailHelperTextStyle}>
                        Contents NOT valid! & should not be empty
                    </HelperText>
                </View>

                <View style={{ marginTop: 20, marginBottom: 10,  }}>
                    <Text style={styles.itemDetailHeadline}>EXPIRATION DATE</Text>
                    <DatePickerInput
                        locale="en"
                        iconSize={30}
                        validRange={{
                            startDate: new Date(minDate),
                            endDate: new Date(maxDate)
                        }}
                        value={textForExpiration}
                        // onChange={(d) => setTextForExpiration(d)}
                        onChangeText={(d) => checkExpirationError(d)}
                        onChange={(d) => handleExpirationChange(d)}
                        inputMode="start"
                        style={[styles.addNewBoxModalTextInput, { width: '90%', backgroundColor: 'lavenderblush'}]}
                        mode="outlined"
                        />
                    <View style={{ alignItems: 'flex-start' }}>
                        <HelperText type="error" visible={expirationError} style={{ marginLeft: 30, marginRight: 30, marginTop: -15, fontSize: 20 }}>
                            {`Expiration date is NOT valid & should be a non-emtpy & between ${moment(minDate).format('MM/DD/YYYY')} and ${moment(maxDate).format('MM/DD/YYYY')}.`}
                        </HelperText>
                    </View>
                </View>

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.itemDetailHeadline}>COUNT</Text>
                    <TextInput textColor="#333"
                        style={styles.addNewBoxModalTextInput}
                        value={textForItemCount}
                        onChangeText={handleItemCountChange}
                        placeholder="Enter item count"
                    />
                    <HelperText type="error" visible={itemCountError} style={styles.itemDetailHelperTextStyle}>
                        Count value is NOT valid! & should not be a numeric & non-empty value
                    </HelperText>
                </View>

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.itemDetailHeadline}>ITEM WEIGHT</Text>
                    <TextInput textColor="#333"
                        label="Weight (OZ)"
                        style={[styles.addNewBoxModalTextInput, { marginBottom: -5 }]}
                        value={textForWeightOz}
                        onChangeText={val => handleWeightChange('oz', val)}
                    />
                    <TextInput textColor="#333"
                        label="Weight (LBS)"
                        style={[styles.addNewBoxModalTextInput, { marginBottom: -5 }]}
                        value={textForWeightLbs}
                        onChangeText={val => handleWeightChange('lbs', val)}
                    />
                    <TextInput textColor="#333"
                        label="Weight (G)"
                        style={styles.addNewBoxModalTextInput}
                        value={textForWeightG}
                        onChangeText={val => handleWeightChange('g', val)}
                    />
                    <HelperText type="error" visible={weightError} style={styles.itemDetailHelperTextStyle}>
                        Weight is NOT valid. It should be non-empty & valid numeric value
                    </HelperText>
                </View>

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.itemDetailHeadline}>ITEM PRICE (OPTIONAL)</Text>
                    <TextInput textColor="#333"
                        label="Item Price"
                        style={styles.addNewBoxModalTextInput}
                        value={textForPrice}
                        onChangeText={handlePriceChange}
                    />
                    <HelperText type="error" visible={priceError} style={styles.itemDetailHelperTextStyle}>
                        Price is NOT valid. It should be non-empty & valid numeric value
                    </HelperText>
                </View>

                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <Text style={[styles.itemDetailHeadline, { marginTop: 10, marginBottom: 5, marginLeft: 5, marginRight: 25 }]}>
                        ITEM CATEGORY</Text>
                    <Divider/>
                    <RadioButton.Group onValueChange={newValue => setCheckedRadioBtnForCategory(newValue)} value={checkedRadioBtnForCategory}>
                        { itemCategoryArr.map(elem => 
                            <TouchableOpacity key={`key-${elem.value}`} onPress={() => setCheckedRadioBtnForCategory(elem.value)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                                    <RadioButton value={elem.value} />
                                    <View style={{ alignItems: 'flex-start', marginLeft: 15 }}>
                                        <Text style={[styles.itemCategoryRadioLabelStyle, getCategoryColors(elem.label)]}>{elem.label}</Text>
                                        <Text style={{fontSize: 15}}>{elem.example}</Text>
                                    </View>
                                    <Divider/>
                                </View>
                                <Divider/>
                            </TouchableOpacity>
                        )}
                    </RadioButton.Group>
                    {/* <RadioButton.Group>
                        { itemCategoryArr.map(elem => 
                            <TouchableOpacity key={`key-${elem.value}`} onPress={() => setCheckedRadioBtnForCategory(elem.value)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                                    <RadioButton value={elem.value} status={checkedRadioBtnForCategory === elem.value ? 'checked' : 'unchecked'}/>
                                    <View style={{ alignItems: 'flex-start', marginLeft: 15 }}>
                                        <Text style={[styles.itemCategoryRadioLabelStyle, getCategoryColors(elem.label)]}>{elem.label}</Text>
                                        <Text style={{fontSize: 15}}>{elem.example}</Text>
                                    </View>
                                    <Divider/>
                                </View>
                                <Divider/>
                            </TouchableOpacity>
                        )}
                    </RadioButton.Group> */}
                </View>

                <View style={[styles.horizontalButtonContainer, { marginTop: 10 } ]}>
                    <Button mode="contained-tonal" icon="check"
                        labelStyle={styles.bigButtonLabelStyle}
                        style={[styles.horizontalButton, styles.bigButtonStyle]} 
                        onPress={submitItemDetails} disabled={shouldDisableSubmitBtn()}>
                        DONE
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    </>);
}

export default ItemDetailScreen;