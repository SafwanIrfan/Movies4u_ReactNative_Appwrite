import {Image, StyleSheet, Text, View} from "react-native";
import {icons} from "@/constants/icons";


const Saved = () => {
    return (
        <View className='bg-primary flex-1 px-10'>
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image
                    source = {icons.save}
                    className = 'size-10'
                    tinitColor = '#fff'
                />
                <Text className='text-gray-500 text-base'>
                    Save
                </Text>
            </View>
        </View>
    )
}

export default Saved;