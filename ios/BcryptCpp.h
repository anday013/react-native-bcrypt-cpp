#ifdef __cplusplus
#import "react-native-bcrypt-cpp.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBcryptCppSpec.h"

@interface BcryptCpp : NSObject <NativeBcryptCppSpec>
#else
#import <React/RCTBridgeModule.h>

@interface BcryptCpp : NSObject <RCTBridgeModule>
#endif

@end
