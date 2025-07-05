import {Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

const MovieCard = ({id, poster_path, title, vote_average, release_date} : Movie) => {
    return (

        //asChild means elements that are inside Link will be touchable
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[29%]'>
                <Image
                    source={{
                        uri : poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-52 rounded-lg'
                />
                <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>
                    {title}
                </Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Image className='size-4' source={icons.star} />
                    <Text className='text-white text-xs font-bold uppercase'>
                        {Math.round(vote_average)/2}
                    </Text>
                </View>

                <View className='flex-row items-center justify-between'>
                    <Text className='text-light-300 text-xs font-medium mt-1'>
                        {release_date?.split('-')[0]}
                    </Text>
                    {/*<Text className='text-light-300 text-sm font-medium'>*/}
                    {/*    Movie*/}
                    {/*</Text>*/}
                </View>
            </TouchableOpacity>
        </Link>

    )
}

export default MovieCard;