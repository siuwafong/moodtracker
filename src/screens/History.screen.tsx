import React from 'react'
import { Text, View } from 'react-native'
import { useAppContext } from '../App.provider'
import { MoodItemRow } from '../components/MoodItemRow'

export const History: React.FC = () => {

    const { handleSelectMood, moodList} = useAppContext()

    return (
        <View>
            {moodList.map(item => (
                <MoodItemRow item={item} key={item.timestamp} />
            ))}
        </View>
    )
}