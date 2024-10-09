import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure that the entire component takes available screen space
  },

  detailsContainer: {
    padding: 20,
    flex: 1, // Ensure that the details container takes up remaining space and allows scrolling
  },
  exerciseList: {
    flexGrow: 1, // Ensure the FlatList grows and takes up the available space
  },
  exerciseListContent: {
    paddingBottom: 20, // Optional padding for better spacing at the end of the list
  },
  exerciseItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
