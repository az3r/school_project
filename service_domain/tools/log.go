package tools

import (
	"fmt"
	"os"
)

func CaptureError(tag string, e error) error {
	if e == nil {
		return e
	}
	message := fmt.Sprintf("%s captured error: %v\n", tag, e)
	fmt.Fprint(os.Stderr, message)
	return e
}
