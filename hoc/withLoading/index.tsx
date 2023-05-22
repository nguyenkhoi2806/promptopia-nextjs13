/* eslint-disable react/display-name */
import Loading from '@/components/Loading';

interface withLoadingProps {
  isLoading: boolean;
  className?: string;
}

const withLoading =
  (WrappedComponent: React.ElementType) => (props: withLoadingProps) => {
    const { isLoading, className } = props;

    if (isLoading) {
      return (
        <div
          className={`loading-wrapper w-full justify-center flex ${className}`}
        >
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

withLoading.defaultProps = {
  className: '',
};

export default withLoading;
