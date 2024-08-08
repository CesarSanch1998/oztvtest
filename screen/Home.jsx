import { View, Text, Platform, TouchableOpacity, ScrollView,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { StatusBar } from "expo-status-bar";
import { styles } from "../theme/index"
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useNavigation } from '@react-navigation/native'
import Loading from "../components/Loading";
import { fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviesdb";
import { height, width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";


const ios = Platform.OS == "ios"
const HomeScreen = () => {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

     //making api call to fetch movies only once
     useEffect(()=>{
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
     },[])


    //  getting trending movies
    const getTrendingMovies=async()=>{
        const data = await fetchTrendingMovies()
        // console.log("got trending movies : ",data);.
        if(data && data.results) setTrending(data.results)
        console.log(trending)
        setLoading(false)
    }

    //  getting upcoming movies
    const getUpcomingMovies=async()=>{
        const data = await fetchUpcomingMovies()
        if(data && data.results) setUpcoming(data.results)
        setLoading(false)
    }

    //  getting top rated movies
    const getTopRatedMovies=async()=>{
        const data = await fetchTrendingMovies()
        if(data && data.results) setTopRated(data.results)
        setLoading(false)
    }
     
    return (
        <View className="flex-1 bg-black">
            {/* search bar and logo */}
            <SafeAreaView className={`${ios ? "-mb-2" : "mb-3"} `} style={{ backgroundColor: 'rgb(194, 26, 38)' }}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color="white" />

                    <Text className="text-white text-3xl font-bold" >
                        {/* <Text style={styles.text}>O</Text>z */}
                        <View >
                        <Image
                                source={require('../assets/loading.png')}
                                className="h-10 w-10"
                                // style={{height:10,width:10}}
                            />
                        </View>
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

            {
                loading ? <Loading /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}>

                        {/* trending movies corousel */}
                        {trending.length>0 && <TrendingMovies data={trending} />}

                        {/* upcoming movies row */}
                        <MovieList title="Nuevos Estrenos" data={upcoming} />

                        {/* Top rated movies row */}
                        <MovieList title="Mas Vistas" data={topRated} />

                        {/* 2024 */}
                        <MovieList title="2024" data={topRated} />


                    </ScrollView>

                )
            }


        </View>
    );
}

export default HomeScreen;