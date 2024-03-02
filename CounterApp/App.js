import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState} from 'react';

export default function App() {
  const [num, setNum] = useState(10)
  const [color, setColor] = useState("red")
  const [pos, setPos] = useState("center")
  const maxSize = 15
  const minSize = 5
  return (
    <View style={styles.container}>
      <View style = {{ borderWidth: 1, borderRadius: 5, width: 300, height: 40}}>
        <Text style = {{fontSize: num*2.5, textAlign: pos, lineHeight: 40, color: color}}>Counter App</Text>
      </View>

      <View style = {{ width: 100, flex:1, flexDirection: 'row' , justifyContent:'space-between', alignItems: 'center', maxHeight: 100, paddingHorizontal:4,}}>
        <TouchableOpacity onPress={()=>{
          let newSize = num - 1
          if(newSize<minSize){
            newSize = maxSize
          }
          setNum(newSize); 
          }
        } style = {{width: 30, height: 30, borderRadius: 50, borderWidth:1, marginVertical: 10,}}> 
         <Text style = {{textAlign: 'center', lineHeight: 26, fontSize: 20}}>-</Text>
        </TouchableOpacity>

        <Text style = {{fontSize: 20}}>{num}</Text>

        <TouchableOpacity onPress={()=>{  
          let newSize = num + 1
          if(newSize>maxSize){
            newSize = minSize
          }
          setNum(newSize); 
          }
        } style = {{width: 30, height: 30, borderRadius: 50, borderWidth:1, marginVertical: 10,}}> 
         <Text style = {{textAlign: 'center', lineHeight: 26, fontSize: 20}}>+</Text>
        </TouchableOpacity>
      </View>

      <View style = {{width: 200, flexDirection: 'row' , justifyContent:'space-between', alignItems: 'center', maxHeight: 100, paddingHorizontal:4,}}>
      <TouchableOpacity onPress={()=>{setColor("red")}} style = {{width: 50, height: 50, borderRadius: 50, borderWidth:1, marginVertical: 10, backgroundColor: color == "red" ? "red" : "white"}}> 
         <Text style = {{textAlign: 'center', lineHeight: 50, fontSize: 15}}>Red</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{setColor("green")}} style = {{width: 50, height: 50, borderRadius: 50, borderWidth:1, marginVertical: 10,backgroundColor: color == "green" ? "green" : "white"}}> 
         <Text style = {{textAlign: 'center', lineHeight: 50, fontSize: 15, color: color == "green" ? "white" : "black"}}>Green</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{setColor("blue")}} style = {{width: 50, height: 50, borderRadius: 50, borderWidth:1, marginVertical: 10,backgroundColor: color == "blue" ? "blue" : "white"}}> 
         <Text style = {{textAlign: 'center', lineHeight: 50, fontSize: 15, color: color == "blue" ? "white" : "black"}}>Blue</Text>
      </TouchableOpacity>
      </View>


      <View style = {{ width: 200, flexDirection: 'row' , justifyContent:'space-between', alignItems: 'center', maxHeight: 100, paddingHorizontal:4,}}>
      <TouchableOpacity onPress={()=>{setPos("left")}} style = {{width: 50, height: 50, borderRadius: 50, borderWidth:1, marginVertical: 10,}}> 
         <Text style = {{textAlign: 'center', lineHeight: 50, fontSize: 15}}>Left</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{setPos("center")}} style = {{width: 50, height: 50, borderRadius: 50, borderWidth:1, marginVertical: 10,}}> 
         <Text style = {{textAlign: 'center', lineHeight: 50, fontSize: 15}}>Center</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{setPos("right")}} style = {{width: 50, height: 50, borderRadius: 50, borderWidth:1, marginVertical: 10,}}> 
         <Text style = {{textAlign: 'center', lineHeight: 50, fontSize: 15}}>Right</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


// rnfes - tự tạo