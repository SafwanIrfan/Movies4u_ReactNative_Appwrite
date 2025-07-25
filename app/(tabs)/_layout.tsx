import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {Tabs} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({focused, icon, title} : any) => {
    return (
            focused ? (
                <ImageBackground
                    source={images.highlight}
                    className="flex flex-row flex-1 min-w-[112px] min-h-14
                        mt-4 justify-center items-center rounded-full overflow-hidden"
                >
                    <Image source={icon}
                           tintColor="#151312" className="size-5"
                    />
                    <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
                </ImageBackground>)
         :
                (
                    <View className="size-full justify-center items-center mt-4 rouned-full">
                        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
                    </View>
                ))
}


const _Layout = () => {
    return (
        <Tabs
        screenOptions={{
            tabBarShowLabel : false, // remove the label of tabs
            tabBarItemStyle : {
                width : "100%",
                height : "100%",
                justifyContent : "center",
                alignItems : "center",
            },
            tabBarStyle : {
                height : 48,
                backgroundColor : "#0f0d23",
                borderRadius : 50,
                marginHorizontal : 20,
                marginBottom : 50,
                position : "absolute",
                overflow : "hidden",
                borderWidth : 1,
                borderColor : "#0f0d23"
            }
        }}
        >
            <Tabs.Screen
            name = "index"
            options={{
                title : "Home",  // tab's title
                headerShown : false, // heading that shows at the top
                tabBarIcon : ({focused}) => (
                    <TabIcon
                        focused = {focused}
                        icon = {icons.home}
                        title = "Home"
                    />
                )}}
            />
            <Tabs.Screen
            name = "search"
            options={{
                title : "Search",
                headerShown : false,
                tabBarIcon : ({focused}) => (
                    <TabIcon
                        focused = {focused}
                        icon = {icons.search}
                        title = "Search"
                    />
                )}}
            />
            <Tabs.Screen
            name = "saved"
            options={{
                title : "Saved",
                headerShown : false, tabBarIcon : ({focused}) => (
                    <TabIcon
                        focused = {focused}
                        icon = {icons.save}
                        title = "Saved"
                    />
                )}}
            />
            <Tabs.Screen
            name = "profile"
            options={{
                title : "Profile",
                headerShown : false,
                tabBarIcon : ({focused}) => (
                    <TabIcon
                        focused = {focused}
                        icon = {icons.person}
                        title = "Profile"
                    />
                )}}
            />
        </Tabs>
    )
}

export default _Layout;