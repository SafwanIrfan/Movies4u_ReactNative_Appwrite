import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from "react-native";
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";
import {updateSearchCount} from "@/services/appwrite";


const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const {
        data : movies,
        loading,
        error,
        refetch : loadMovies,
        reset
    } = useFetch(() => fetchMovies({
        query : searchQuery,
    }),false)

    useEffect(()=>{
        // This helps to work efficiently not calling api after every letter. Instead
        // 500ms after user stops searching.
        const timeoutId = setTimeout(async () => {
        if(searchQuery.trim()) {
            await loadMovies();
        } else {
            reset()
        }
        }, 500)

        return () => clearTimeout(timeoutId)
    },[searchQuery])

    useEffect(() => {
        if(movies?.length > 0 && movies[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies])

    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className='flex-1 absolute w-full z-0'
                   resizeMode="cover"
            />
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                className='px-5'
                columnWrapperStyle={{
                    gap : 16,
                    justifyContent : 'center',
                    marginVertical : 16
                }}
                contentContainerStyle = {{
                    paddingBottom : 100
                }}
                ListHeaderComponent = {
                <>
                    <View className='w-full flex-row justify-center mt-20 items-center'>
                        <Image source={icons.logo} className='w-12 h-10' />
                    </View>
                    <View>
                        <SearchBar
                            placeholder='Search movies...'
                            value = {searchQuery}
                            onChangeText = {setSearchQuery}
                        />
                    </View>
                    {loading && (
                        <ActivityIndicator size='large' color='#0000ff' className='my-3' />
                    )}

                    {error && (
                        <Text className='text-red-500 px-5 my-3'>Error : {error?.message}</Text>
                    )}

                    {!loading && !error && searchQuery.trim() &&
                        movies?.length > 0 && (
                            <Text className='text-xl text-white font-bold'>
                                Search results for{' '}
                                <Text className='text-accent'>{searchQuery}</Text>
                            </Text>
                        )
                    }
                </>
                }
                ListEmptyComponent = {
                !loading && !error
                    ?
                    (
                        <View className='mt-10 px-5'>
                            <Text className='mx-auto font-bold text-light-300'>
                                {searchQuery.trim()
                                    ? 'No movies found'
                                    : 'Search for movie'
                                }
                            </Text>
                        </View>
                    )
                    : null
                }
            />
        </View>
    )
}

export default Search;