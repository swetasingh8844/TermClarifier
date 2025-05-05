import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDefinition = async () => {
    if (!term.trim()) {
      Alert.alert('Error', 'Please enter a term to search');
      return;
    }

    setLoading(true);
    setError(null);
    setDefinition(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term.trim()}`);
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'Term not found' : 'Network error');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setDefinition(data[0]);
      } else {
        throw new Error('No definition found');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to highlight synonyms in the definition
  const highlightSynonyms = (text, synonyms) => {
    if (!synonyms || synonyms.length === 0 || !text) return text;
    
    let highlightedText = text;
    synonyms.forEach(synonym => {
      // Case insensitive global replace
      const regex = new RegExp(`\\b${synonym}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `_${synonym}_`);
    });
    
    // Split by highlighted words and map to text/highlighted components
    const parts = highlightedText.split(/(_[^_]+_)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('_') && part.endsWith('_')) {
        // This is a synonym
        const synonymText = part.slice(1, -1);
        return <Text key={index} style={styles.highlight}>{synonymText}</Text>;
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  const getAllSynonyms = () => {
    if (!definition || !definition.meanings) return [];
    
    const allSynonyms = definition.meanings.reduce((acc, meaning) => {
      if (meaning.definitions) {
        meaning.definitions.forEach(def => {
          if (def.synonyms && def.synonyms.length > 0) {
            acc = [...acc, ...def.synonyms];
          }
        });
      }
      
      if (meaning.synonyms && meaning.synonyms.length > 0) {
        acc = [...acc, ...meaning.synonyms];
      }
      
      return acc;
    }, []);
    // Remove duplicates
    return [...new Set(allSynonyms)]; 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Term Clarifier</Text>
        <Text style={styles.subtitle}>Look up any term for its definition</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={term}
          onChangeText={setTerm}
          placeholder="Enter a term (e.g., photosynthesis)"
          onSubmitEditing={fetchDefinition}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={fetchDefinition}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Looking up term...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.errorSubtext}>Please try another term or check your connection.</Text>
        </View>
      )}

      {definition && !loading && !error && (
        <ScrollView style={styles.resultContainer}>
          <View style={styles.card}>
            <Text style={styles.termText}>{definition.word}</Text>
            
            {definition.phonetic && (
              <Text style={styles.phoneticText}>
                {definition.phonetic}
              </Text>
            )}

            {definition.meanings && definition.meanings.map((meaning, index) => (
              <View key={index} style={styles.meaningContainer}>
                <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                
                {meaning.definitions && meaning.definitions.map((def, defIndex) => (
                  <View key={defIndex} style={styles.definitionContainer}>
                    <Text style={styles.definitionNumber}>{defIndex + 1}.</Text>
                    <View style={styles.definitionTextContainer}>
                      <Text style={styles.definitionText}>
                        {highlightSynonyms(def.definition, getAllSynonyms())}
                      </Text>
                      
                      {def.example && (
                        <Text style={styles.exampleText}>
                          Example: &quot;{def.example}&quot;
                        </Text>
                      )}
                      
                      {def.synonyms && def.synonyms.length > 0 && (
                        <View style={styles.synonymsContainer}>
                          <Text style={styles.synonymsLabel}>Synonyms: </Text>
                          <Text style={styles.synonymsText}>
                            {def.synonyms.join(', ')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#c62828',
    fontWeight: 'bold',
  },
  errorSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  resultContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  termText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  phoneticText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  meaningContainer: {
    marginBottom: 16,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6200ee',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  definitionContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  definitionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#444',
  },
  definitionTextContainer: {
    flex: 1,
  },
  definitionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  exampleText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  synonymsContainer: {
    flexDirection: 'row',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  synonymsLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  synonymsText: {
    fontSize: 14,
    color: '#6200ee',
  },
  highlight: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    fontWeight: '600',
    borderRadius: 2,
    overflow: 'hidden',
  },
});
