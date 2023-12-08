import React, { useState, } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, List, Divider, IconButton, MD3Colors, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { setBoxItems } from '../actions/action'
import { getCategoryColors } from '../utils/helper';
// import { categoryColors } from '../constants/constants'

const ItemListElem = ({route, elem, id, onDuplicate, navigation}) => {
    const dispatch = useDispatch()
    const curBoxItems = useSelector(state => state.curBoxItems);
    const windowWidth = useWindowDimensions().width;
    
    const listElemStyles = StyleSheet.create({
        titleStyle: { fontSize: windowWidth * 0.05, marginBottom: 5 },
        categoryStyle: { 
            fontSize: windowWidth * 0.018, color: 'gray', marginRight: 10,
            paddingLeft: 5, paddingRight: 5, paddingTop: 3, paddingBottom: 3, borderRadius: 5
        },
        subtitleGrayStyle: { fontSize: windowWidth * 0.022, color: 'gray', },
        subtitleBlackStyle: { fontSize: windowWidth * 0.022, color: '#111', },
        subtitleMissingStyle: { fontSize: windowWidth * 0.022, color: 'red', },
        listCountStyle: { fontSize: windowWidth * 0.03, },
    })

    const plusButtonHandler = () => {
        const newItemList = curBoxItems.map(item => {
            if (item.item_id === elem.item_id) {
                const newVal = Number(item.item_count) + 1
                return { ...item, item_count: newVal.toString() };
            }
            return item;
        });
        dispatch(setBoxItems(newItemList));
    }
    
    const minusButtonHandler = () => {
        let newItemList = curBoxItems.map(item => {
            if (item.item_id === elem.item_id) {
                const newVal = item.item_count - 1
                return { ...item, item_count: newVal.toString() };
            }
            return item;
        });
        newItemList = newItemList.filter(item => !(item.item_id === elem.item_id && Number(item.item_count) === 0));
        dispatch(setBoxItems(newItemList));
    }

    // const getElementBackgroundColor = () => {
    //     const elemColor = categoryColors.find(item => item.label === elem.item_category);
    //     return elemColor ? { backgroundColor: elemColor.backgroundColor, color: elemColor.color } : {}
    // }

    // console.log('elem.item_expiration: ', elem.item_expiration)
    return (
        <View key={id}  style={{ width: '95%', marginLeft: 20  }}>
            <List.Item
                title={elem.item_content}
                titleStyle={listElemStyles.titleStyle}
                description={() => 
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[ listElemStyles.categoryStyle, getCategoryColors(elem.item_category)]}>
                            {(elem?.item_category).toUpperCase()}
                        </Text>
                        <Text style={listElemStyles.subtitleGrayStyle}>
                            {elem.item_brand}   |
                        </Text>
                        <Text style={listElemStyles.subtitleBlackStyle}>
                            {` `}{elem.item_weight_lbs}{` `}
                        </Text>
                        <Text style={listElemStyles.subtitleGrayStyle}>
                            (lbs) {` `} |  Expire:{` `}
                        </Text>
                        <Text style={elem.item_expiration ? listElemStyles.subtitleGrayStyle : listElemStyles.subtitleMissingStyle }>
                            { elem.item_expiration ? new Date(elem.item_expiration).toLocaleDateString('en-US') : "???????" }
                        </Text>
                    </View>
                }
                onPress={() => navigation.navigate('ItemDetailScreen', { itemSelected: elem })}
                right={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton icon='content-duplicate' size={50} iconColor='#333' 
                            onPress={onDuplicate}/>
                        <IconButton icon="minus-circle" size={50} iconColor={'#8b0000'} // #f2c9c9
                            onPress={minusButtonHandler}
                        />
                        <Text style={listElemStyles.listCountStyle}>{elem.item_count}</Text>
                        <IconButton icon="plus-circle" size={50} iconColor={'#00008b'} // #a1a1f0
                            onPress={plusButtonHandler}
                        />
                    </View>
                )}
            />
            <Divider/>
        </View>
    )
}

export default ItemListElem;