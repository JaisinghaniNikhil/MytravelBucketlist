import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
} from 'react-native';

type Destination = {
  id: number;
  name: string;
  visited: boolean;
};

const App = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const addDestination = () => {
    const trimmed = destination.trim();
    if (trimmed.length === 0) return;

    const newItem: Destination = {
      id: Date.now(),
      name: trimmed,
      visited: false,
    };

    setDestinations(prev => [...prev, newItem]);
    setDestination('');
  };

  const toggleVisited = (id: number) => {
    setDestinations(prev =>
      prev.map(item =>
        item.id === id ? { ...item, visited: !item.visited } : item
      )
    );
  };

  const deleteDestination = (id: number) => {
    setDestinations(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Travel List ✈️</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
        />
        <Pressable style={styles.addButton} onPress={addDestination}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.cardText, item.visited && styles.visitedText]}>
              {item.name}
            </Text>

            <View style={styles.tag}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {item.visited ? 'Visited ✅' : 'Not Visited ❌'}
              </Text>
            </View>

            <View style={styles.cardButtons}>
              <Pressable
                style={styles.visitButton}
                onPress={() => toggleVisited(item.id)}
              >
                <Text style={styles.btnText}>
                  {item.visited ? 'Mark Unvisited' : 'Mark Visited'}
                </Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteDestination(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No destinations yet. Add one!</Text>}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  visitedText: {
    color: 'green',
    textDecorationLine: 'line-through',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#888',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
    
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  visitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
});
