import { Stack } from "expo-router";

export default function Navigation() {
    return (
        <Stack
            screenOptions={{
                gestureEnabled: true,
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Trans.",
                }}
            />
            <Stack.Screen
                name="addTransaction"
                options={{
                    title: "Add Transaction",
                }}
            />
            <Stack.Screen
                name="editTransaction"
                options={{
                    title: "Edit Transaction",
                }}
            />
        </Stack>
    )
}