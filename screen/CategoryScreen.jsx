import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { debounce } from "lodash";
import { useRoute, useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { styles, theme } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { fallbackMoviePoster, image185, searchMovies } from "../api/moviesdb";

let { width, height } = Dimensions.get("window");

export default function CategoryScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { params: movieCategory } = useRoute();

    useEffect(() => {
        console.log(movieCategory);
    }, [movieCategory]);

    return (
        <SafeAreaView className="bg-black flex-1">
            {/* results */}
            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className="space-y-3"
                >
                    <View className="flex-row justify-between flex-wrap">
                            <TouchableOpacity
                                style={styles.background}
                                className="rounded-xl p-1"
                                onPress={() => navigation.goBack()}
                            >
                                <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                            </TouchableOpacity>
                            <Text className={"text-white text-2xl"}>{movieCategory}</Text>
                        {results.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => navigation.push("Movie", item)}
                                >
                                    <View className="space-y-2 mb-4">
                                        <Image
                                            source={{
                                                uri: image185(item.poster_path) || fallbackMoviePoster,
                                            }}
                                            // source={require('../assets/images/moviePoster2.png')}
                                            className="rounded-3xl"
                                            style={{ width: width * 0.44, height: height * 0.3 }}
                                        />
                                        <Text className="text-gray-300 ml-1">
                                            {item?.title.length > 22
                                                ? item?.title.slice(0, 22) + "..."
                                                : item?.title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
