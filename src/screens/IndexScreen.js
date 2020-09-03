import React,{useContext, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import {Context} from '../context/BlogContext'
import Feather from 'react-native-vector-icons/Feather'
const IndexScreen =({navigation})=>{
    
    const { state , deleteBlogPost, getBlogPosts}= useContext(Context)
    useEffect(()=>{
        getBlogPosts();
       const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        return()=>{
            listener.remove();
        }
    }, [])
    return(
        <View>
          
            <View>
            <FlatList 
                data={state}
                keyExtractor={blogPost=>blogPost.title}
                renderItem={({item}) =>{
                    return( 
                        <View>
                            <TouchableOpacity onPress={()=>navigation.navigate('Show', {id:item.id})}>
                        <View style={styles.row}> 
                        
                    <Text style={styles.title}>
                        {item.title} - {item.id}
                    </Text>
                    <TouchableOpacity onPress={()=>deleteBlogPost(item.id)} >
                    <Feather name="trash" size={24}/>
                    </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
                    </View>
                    
                    )
                }}
            />
            </View>
        </View>
    )
}

IndexScreen.navigationOptions=({navigation})=>{
    return{
        headerRight:
        <TouchableOpacity onPress={()=>{navigation.navigate('Create')}}>
        <Feather name="plus" size={30}/>
        </TouchableOpacity>
    };
}
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        paddingHorizontal:10,
        borderTopWidth:1,
        borderColor:'gray'
    },
    title:{
        fontSize:18,
        // paddingLeft:5
    }
})
export default IndexScreen;