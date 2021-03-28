import { StyleSheet ,Dimensions} from "react-native";
export const color1 = "#9FB3C8";
export const color2 = "#486581";
export const color3 = "#f0f4f8";
export const color4 = "#333333";
export const color2Dark = '#132f49';
export const color1Dark='#BCCCDC'
const height= Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  landContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: color1,
  },
  largeButton: {
    height: 60,
    width: 250,
    backgroundColor: color2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButton: {
    height: 50,
    width: 300,
    backgroundColor: color2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  moreInfoButton:{
    height: 30,
    width: 120,
    marginHorizontal: 10,
    marginVertical:0,
    backgroundColor: color2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  inputCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color3,
    height: 450,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
 
    padding: 20,
    borderRadius: 8,
  },
  singupCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color3,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    borderRadius: 8,
  },
  loginInputBox: {
    padding: 10,
    borderRadius: 20,
    height: 70,
    fontSize: 22,
    width: 300,
    marginTop: 15,
    marginBottom: 20,
    color: color4,
    borderBottomColor: color2,
    borderBottomWidth: 2,
  },
  textInput: {
    padding: 7,
    borderRadius: 20,
    height: 53,
    fontSize: 18,
    width: 300,
    marginTop: 8,
    marginBottom: 8,
    color: color4,
    borderBottomColor: color2,
    borderBottomWidth: 2,
  },
  numberInput: {
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    height: 53,
    fontSize: 18,
    width: 100,
    marginTop: 8,
    marginBottom: 8,
    color: color4,
    borderBottomColor: color2,
    borderBottomWidth: 2,
  },
  signupTitle: { fontSize: 20, color: color2 },
  profileCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color3,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    borderRadius: 8,
  },
  stats: {
    color: "#333",
    fontSize: 24,
    marginHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: color2,
  },
  weightCard: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 350,
    backgroundColor: color3,
    borderRadius: 8,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  programCard:{
 
 
    height:500,
    width: 350,
    backgroundColor: color3,
    borderRadius: 8,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  workoutCard:{
    alignItems:'center',
  marginTop:50,
    width:width*.90,
    flex:3,
    backgroundColor:color3,
    justifyContent:'center',
    borderRadius:25,
    marginBottom:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,


  },
  timerCard:{
    alignItems:'center',

    width:width*.90,
    flex:3,
    backgroundColor:color3,
    justifyContent:'center',
    borderRadius:25,
    marginBottom:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  workoutImage:{
 
     flex:3,
   
  }
});


export default styles;
