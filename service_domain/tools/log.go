package tools

import (
	"fmt"
	"os"
)

func CaptureError(tag string, e error) {
	message := fmt.Sprintf("%s captured error: %v", tag, e)
	fmt.Fprint(os.Stderr, message)
}
