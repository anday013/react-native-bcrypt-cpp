
#include "NativeBcryptCppTurboModule.h"



namespace facebook::react {
NativeBcryptCppTurboModule::NativeBcryptCppTurboModule(std::shared_ptr<CallInvoker> jsinvoker): NativeBcryptCppCxxSpec<NativeBcryptCppTurboModule>(std::move(jsinvoker)) {}

jsi::Value NativeBcryptCppTurboModule::generateHash(jsi::Runtime &rt, std::string password, double workload) {
    return jsi::Value::undefined();
}


jsi::Value NativeBcryptCppTurboModule::validatePassword(jsi::Runtime &rt, std::string password, std::string hash) {
    return jsi::Value::undefined();
}
std::string NativeBcryptCppTurboModule::generateHashSync(jsi::Runtime &rt, std::string password, double workload){
    
    return "generateHashSync";
}
bool NativeBcryptCppTurboModule::validatePasswordSync(jsi::Runtime &rt, std::string password, std::string hash) {
    return "validatePasswordSync";
}

}
