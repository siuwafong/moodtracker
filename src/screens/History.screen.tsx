import React from 'react'
import { ScrollView } from 'react-native'
import { useAppContext } from '../context/App.provider'
import { MoodItemRow } from '../components/MoodItemRow'

export const History: React.FC = () => {

    const { handleSelectMood, moodList} = useAppContext()

    // slice will create a new copy of the array instead of mutating it with reverse
    return (
        <ScrollView>
            {moodList.slice().reverse().map(item => (
                <MoodItemRow item={item} key={item.timestamp} />
            ))}
        </ScrollView>
    )
}