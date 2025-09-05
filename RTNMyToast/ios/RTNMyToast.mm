#import "RTNMyToast.h"
#import <UIKit/UIKit.h>

@implementation RTNMyToast

// This tells React Native that the module can be accessed via JavaScript.
RCT_EXPORT_MODULE();

// Expose the 'showToast' method to JavaScript.
RCT_EXPORT_METHOD(showToast:(NSString *)message) {
    // Get the root view controller to present the alert.
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;

    UIAlertController *alert = [UIAlertController alertControllerWithTitle:nil
                                                                   message:message
                                                            preferredStyle:UIAlertControllerStyleAlert];

    // Present the alert on the main thread.
    dispatch_async(dispatch_get_main_queue(), ^{
        [rootViewController presentViewController:alert animated:YES completion:nil];
    });

    // Dismiss the alert after 2 seconds.
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        [alert dismissViewControllerAnimated:YES completion:nil];
    });
}

@end
