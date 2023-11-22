import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { Button, Card, List, Avatar, Divider, Text, TextInput, MD3Colors } from 'react-native-paper';
import { setBoxItems, setLoaderStatus } from '../actions/action';
import { getUniqueId } from '../utils/helper'
import ItemListElem from './../components/ItemListElem'
import NoElemComp from '../components/NoElemComp'
import customStyles from '../styles/customStyles' 
import { addDoc, setDoc, collection, writeBatch, doc } from 'firebase/firestore';
import { db, auth } from '../../src/utils/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import _ from 'lodash';
// import { tempDataForItemList, tempDataForBoxList } from '../constants/constants';

const ItemListScreen = ({ route, navigation }) => {
    // const [textForBoxInitial, setTextForBoxInitial] = React.useState("");
    const [currentUser, setCurrentUser] = React.useState(null); // firebase auth 상태 추적용
    // const [itemList, setItemList] = useState(tempDataForItemList);

    const dispatch = useDispatch()
    const styles = customStyles();
    const curBoxInitial = useSelector(state => state.curBoxInitial);
    const curBoxId = useSelector(state => state.curBoxId);
    const curBoxItems = useSelector(state => state.curBoxItems);
    const boxesData = useSelector(state => state.boxesData);

    useEffect(() => {
        dispatch(setLoaderStatus(true))
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            // fetchBoxesData();
            setCurrentUser(user);
            }
        });
        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    useEffect(() => {
        // console.log('updated curBoxItems.len: ', curBoxItems.length)
        // console.log('updated curBoxItems: ', curBoxItems, '\n')
        dispatch(setLoaderStatus(false))
    }, [curBoxItems]);
        
    const handleDuplicate = (idx) => {
        const newItemList = [...curBoxItems];
        const newItem = { ...newItemList[idx], item_id: `item-${getUniqueId()}`, item_expiration: null };
        newItemList.splice(idx + 1, 0, newItem);
        // setItemList(newItemList);
        dispatch(setBoxItems(newItemList));
    };

    const handleNewItemBtn = () => {
        const newEmptyObj = { 
            box_id: "",
            item_id: `item-${getUniqueId()}`,
            item_barcode: "",
            item_brand: "",
            item_content: "",
            item_expiration: null,
            item_weight_oz: "",
            item_weight_lbs: "",
            item_weight_g: "",
            item_price: "",
            item_category: null,
            item_count: "1",
        };
        navigation.navigate('ItemDetailScreen', { itemSelected: newEmptyObj })
    }

    const shouldDisableSaveBtn = () => {
        // console.log('ItemListScreen - curBoxItems: ', curBoxItems)
        let shouldDisable = false;
        
        const found = boxesData.find(box => box.box_id === curBoxItems.box_id)
        if(found) shouldDisable = _.isEqual(found, curBoxItems); 
        if(curBoxItems.length === 0) shouldDisable = true;
        
        const emptyDate = curBoxItems.find(item => item.item_expiration === null)
        if(emptyDate) return true; 

        return shouldDisable;
    }

    const saveBoxItemsList = async () => {
        // console.log('ItemListScreen - curBoxItems: ', curBoxItems)
        let totalPrice = 0;
        let totalWeightLbs = 0;
        curBoxItems.forEach(elem => {
            totalPrice += !isNaN(elem.item_price) ? Number(elem.item_price) : 0;
            totalWeightLbs += !isNaN(elem.item_weight_lbs) ? Number(elem.item_weight_lbs) : 0;
        })

        const boxPayload = {
            box_id: curBoxId,
            box_initial: curBoxInitial,
            updated: new Date(),
            items_count: curBoxItems.length,
            items_price: totalPrice,
            items_weight: totalWeightLbs,
        }
        // console.log('boxPayload: ', boxPayload)
        // console.log('curBoxItems: ', curBoxItems)

        const batch = writeBatch(db);
        const boxRef = doc(db, 'boxes', boxPayload.box_id); // Create a document reference with box_id

        // Add boxPayload to boxes collection
        batch.set(boxRef, boxPayload);

        // For each item in curBoxItems, add it to box_items collection
        for (let item of curBoxItems) {
            const itemRef = doc(collection(boxRef, 'box_items'), item.item_id); // Create a document reference with item_id in box_items collection
            batch.set(itemRef, item); // Add item to box_items collection
        }

        // Commit the batch
        batch.commit()
            .then(() => {
                console.log(`Successfully added box ${boxPayload.box_id} and its items to Firestore`);
                navigation.navigate('HomeScreen');
            })
            .catch(err => {
                console.error(`Failed to add box ${boxPayload.box_id} and its items to Firestore: `, err);
            });
    }

    return (<> 
        <ScrollView>    
            <View style={styles.container}>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <TextInput
                        label="Box Initial" disabled textColor="#777"
                        style={styles.addNewBoxModalTextInput}
                        value={curBoxInitial}
                    />
                </View>
                <View style={[styles.horizontalButtonContainer, { marginTop: -15 } ]}>
                    <Button mode="contained-tonal" icon="barcode-scan" 
                        labelStyle={styles.bigButtonLabelStyle} // contentStyle={{fontSize: 20}}
                        style={[styles.horizontalButton, styles.bigButtonStyle]} 
                        onPress={() => {}}>
                        SCAN
                    </Button>
                    <Button mode="contained-tonal" icon="plus" 
                        labelStyle={styles.bigButtonLabelStyle} // contentStyle={{fontSize: 20}}
                        style={[styles.horizontalButton, styles.bigButtonStyle]} 
                        onPress={() => handleNewItemBtn()}
                        >
                        New Item
                    </Button>
                </View>
                
                {  curBoxItems.length === 0
                   ? <NoElemComp targetString="Item"/>
                   : curBoxItems.map((elem, idx ) => 
                        <ItemListElem elem={elem} id={`key-${idx}`} key={`key-${idx}`}
                            route={route} navigation={navigation} onDuplicate={() => handleDuplicate(idx)}/>
                    )                    
                }
                <View style={[styles.horizontalButtonContainer, { justifyContent: 'center'}]}>
                    <Button icon="content-save" mode="contained-tonal" 
                        labelStyle={styles.bigButtonLabelStyle} 
                        style={[styles.bigButtonStyle, { width: '95%', marginTop: 10, }]} 
                        disabled={shouldDisableSaveBtn()}
                        onPress={() => saveBoxItemsList()}>SAVE</Button>
                </View>
            </View>
        </ScrollView>
    </>);
}

export default ItemListScreen;