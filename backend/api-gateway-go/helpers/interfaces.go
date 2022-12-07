package helpers

import "encoding/json"

func ConvertSlice[T any](sliceToConvert []interface{}) []T {
	var resultSlice = make([]T, 0)

	for _, itm := range sliceToConvert {
		resultSlice = append(resultSlice, itm.(T))
	}

	return resultSlice
}

func MapStruct[T any](mapData map[string]interface{}) (result T, err error) {
	// first convert map to json
	jsonData, err := json.Marshal(mapData)
	//if there is no error try to convert jsonData to generic struct
	if err == nil {
		err = json.Unmarshal(jsonData, &result)
	}

	return result, err
}
