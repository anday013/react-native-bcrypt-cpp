#include <jni.h>
#include "react-native-bcrypt-cpp.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_bcryptcpp_BcryptCppModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return bcryptcpp::multiply(a, b);
}
